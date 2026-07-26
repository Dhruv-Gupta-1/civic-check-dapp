// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CivicCheck — Decentralized Civic Accountability Protocol
 * @dev Records government project proposals and citizen votes on-chain as permanent Proof of Work.
 */
contract CivicCheck {
    enum Category { Infrastructure, Healthcare, Education, Digital, Sanitation, Energy, Other }
    enum Status { Voting, Active, Completed, Flagged }
    enum VoteChoice { Necessary, Overfunded }

    struct Project {
        uint256 id;
        string name;
        uint256 budgetInINR;
        string region;
        Category category;
        string ipfsCid;
        address contractor;
        address politician;
        Status status;
        uint256 necessaryVotes;
        uint256 overfundedVotes;
        uint256 createdAt;
    }

    struct VoteReceipt {
        uint256 projectId;
        VoteChoice choice;
        uint256 timestamp;
        bytes32 blockHash;
    }

    address public admin;
    uint256 public projectCount;

    mapping(uint256 => Project) public projects;
    mapping(address => bool) public verifiedCivics;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => VoteReceipt[]) private voterHistory;

    event CivicIdVerified(address indexed citizen, uint256 timestamp);
    event ProjectPosted(
        uint256 indexed projectId,
        string name,
        uint256 budgetInINR,
        string region,
        Category category,
        address indexed politician,
        string ipfsCid,
        uint256 timestamp
    );
    event VoteCast(
        uint256 indexed projectId,
        address indexed voter,
        VoteChoice choice,
        uint256 totalNecessary,
        uint256 totalOverfunded,
        uint256 timestamp
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyVerifiedCitizen() {
        require(verifiedCivics[msg.sender], "Civic ID verification required");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function selfVerifyCivicId() external {
        require(!verifiedCivics[msg.sender], "Already verified");
        verifiedCivics[msg.sender] = true;
        emit CivicIdVerified(msg.sender, block.timestamp);
    }

    function postProject(
        string calldata _name,
        uint256 _budgetInINR,
        string calldata _region,
        Category _category,
        string calldata _ipfsCid,
        address _contractor
    ) external returns (uint256) {
        projectCount++;
        projects[projectCount] = Project({
            id: projectCount,
            name: _name,
            budgetInINR: _budgetInINR,
            region: _region,
            category: _category,
            ipfsCid: _ipfsCid,
            contractor: _contractor,
            politician: msg.sender,
            status: Status.Voting,
            necessaryVotes: 0,
            overfundedVotes: 0,
            createdAt: block.timestamp
        });

        emit ProjectPosted(projectCount, _name, _budgetInINR, _region, _category, msg.sender, _ipfsCid, block.timestamp);
        return projectCount;
    }

    function castVote(uint256 _projectId, VoteChoice _choice) external onlyVerifiedCitizen {
        require(_projectId > 0 && _projectId <= projectCount, "Invalid project");
        require(!hasVoted[_projectId][msg.sender], "Already voted on this project");

        Project storage project = projects[_projectId];
        hasVoted[_projectId][msg.sender] = true;

        if (_choice == VoteChoice.Necessary) {
            project.necessaryVotes++;
        } else {
            project.overfundedVotes++;
        }

        voterHistory[msg.sender].push(VoteReceipt({
            projectId: _projectId,
            choice: _choice,
            timestamp: block.timestamp,
            blockHash: blockhash(block.number - 1)
        }));

        emit VoteCast(_projectId, msg.sender, _choice, project.necessaryVotes, project.overfundedVotes, block.timestamp);
    }

    function getUserVotes(address _voter) external view returns (VoteReceipt[] memory) {
        return voterHistory[_voter];
    }
}
