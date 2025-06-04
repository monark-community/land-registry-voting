
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, MapPin, Calendar, User, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'pending';
  votes: { for: number; against: number };
  deadline: string;
  region: string;
  proposer: string;
}

interface ProposalCardProps {
  proposal: Proposal;
  userRole: 'landowner' | 'proposer' | 'validator' | null;
}

const ProposalCard = ({ proposal, userRole }: ProposalCardProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'for' | 'against' | null>(null);
  const { toast } = useToast();

  const totalVotes = proposal.votes.for + proposal.votes.against;
  const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
  
  const handleVote = (vote: 'for' | 'against') => {
    setHasVoted(true);
    setUserVote(vote);
    
    toast({
      title: "Vote Recorded",
      description: `Your ${vote === 'for' ? 'support' : 'opposition'} has been recorded on the blockchain.`,
    });
  };

  const getStatusIcon = () => {
    switch (proposal.status) {
      case 'active':
        return <Vote className="h-4 w-4" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (proposal.status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getStatusColor()}>
                {getStatusIcon()}
                <span className="ml-1 capitalize">{proposal.status}</span>
              </Badge>
              <Badge variant="outline">
                <MapPin className="h-3 w-3 mr-1" />
                {proposal.region}
              </Badge>
            </div>
            <CardTitle className="text-xl">{proposal.title}</CardTitle>
            <CardDescription className="mt-2">{proposal.description}</CardDescription>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Proposed by {proposal.proposer}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {new Date(proposal.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Voting Results */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-green-600 font-medium">For: {proposal.votes.for}</span>
              <span className="text-red-600 font-medium">Against: {proposal.votes.against}</span>
            </div>
            <Progress value={forPercentage} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{totalVotes} total votes</p>
          </div>

          {/* Voting Buttons */}
          {proposal.status === 'active' && userRole === 'landowner' && !hasVoted && (
            <div className="flex space-x-3">
              <Button 
                onClick={() => handleVote('for')}
                variant="outline" 
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Vote For
              </Button>
              <Button 
                onClick={() => handleVote('against')}
                variant="outline" 
                className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Vote Against
              </Button>
            </div>
          )}

          {/* Vote Confirmation */}
          {hasVoted && (
            <div className={`p-3 rounded-lg border-2 ${
              userVote === 'for' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center space-x-2">
                {userVote === 'for' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <span className="font-medium">
                  You voted {userVote === 'for' ? 'FOR' : 'AGAINST'} this proposal
                </span>
              </div>
              <p className="text-xs mt-1 opacity-75">Vote recorded on blockchain: 0x{Math.random().toString(16).substr(2, 8)}...</p>
            </div>
          )}

          {/* Non-voting states */}
          {proposal.status === 'pending' && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Voting not yet open</span>
              </div>
            </div>
          )}

          {proposal.status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Proposal passed - Implementation in progress</span>
              </div>
            </div>
          )}

          {userRole !== 'landowner' && proposal.status === 'active' && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
              <p className="text-sm">Only verified landowners can vote on this proposal</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
