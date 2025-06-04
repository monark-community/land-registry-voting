
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, MapPin, Users, CheckCircle, Clock } from "lucide-react";
import LandMap from "@/components/LandMap";
import ProposalCard from "@/components/ProposalCard";
import ConnectWallet from "@/components/ConnectWallet";
import CreateProposal from "@/components/CreateProposal";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userRole, setUserRole] = useState<'landowner' | 'proposer' | 'validator' | null>(null);
  const [selectedView, setSelectedView] = useState<'map' | 'proposals' | 'create'>('map');

  // Mock data for demonstration
  const mockProposals = [
    {
      id: "1",
      title: "Downtown Zoning Amendment - Mixed Use Development",
      description: "Proposal to allow mixed-use development in the downtown core to increase housing density and commercial opportunities.",
      status: "active" as const,
      votes: { for: 34, against: 12 },
      deadline: "2024-06-20",
      region: "Downtown District",
      proposer: "City Planning Department"
    },
    {
      id: "2", 
      title: "Green Belt Preservation Initiative",
      description: "Establish protected green spaces along the riverfront to prevent commercial development and preserve natural habitat.",
      status: "passed" as const,
      votes: { for: 78, against: 23 },
      deadline: "2024-06-15",
      region: "Riverfront Area", 
      proposer: "Environmental Coalition"
    },
    {
      id: "3",
      title: "Public Transit Expansion - Route 15",
      description: "Extend bus route 15 to serve the new residential developments in the northern sector.",
      status: "pending" as const,
      votes: { for: 0, against: 0 },
      deadline: "2024-06-25",
      region: "Northern Sector",
      proposer: "Transportation Authority"
    }
  ];

  const mockLandParcels = [
    { id: "1", owner: "0x1234...5678", coordinates: [40.7589, -73.9851], status: "eligible" },
    { id: "2", owner: "0x8765...4321", coordinates: [40.7614, -73.9776], status: "voted" },
    { id: "3", owner: "0x2468...1357", coordinates: [40.7505, -73.9934], status: "eligible" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  LandVote
                </h1>
                <p className="text-sm text-gray-600">Civic Governance for Landowners</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected as {userRole}
                </Badge>
              )}
              <ConnectWallet 
                isConnected={isConnected}
                onConnect={() => {
                  setIsConnected(true);
                  setUserRole('landowner'); // Simulate connection
                }}
                onDisconnect={() => {
                  setIsConnected(false);
                  setUserRole(null);
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {isConnected && (
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              <button
                onClick={() => setSelectedView('map')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  selectedView === 'map' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MapPin className="h-4 w-4 inline mr-2" />
                Land Map
              </button>
              <button
                onClick={() => setSelectedView('proposals')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  selectedView === 'proposals' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Vote className="h-4 w-4 inline mr-2" />
                Proposals
              </button>
              <button
                onClick={() => setSelectedView('create')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  selectedView === 'create' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Create Proposal
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          /* Landing Page */
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Democracy Meets
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Land Ownership</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                LandVote empowers landowners to participate in community governance through blockchain-verified voting on zoning, infrastructure, and resource allocation decisions that affect their properties.
              </p>
              <div className="flex justify-center">
                <ConnectWallet 
                  isConnected={false}
                  onConnect={() => {
                    setIsConnected(true);
                    setUserRole('landowner');
                  }}
                  onDisconnect={() => {}}
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-900">Geographic Voting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Vote on proposals that directly affect your land parcels with visual map integration showing impact zones.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900">Verified Ownership</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Blockchain-verified land ownership ensures only legitimate stakeholders can vote on relevant proposals.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-900">Transparent Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All votes and proposals are immutably recorded on-chain for complete transparency and accountability.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Demo Map */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Sample Land Parcel Visualization</CardTitle>
                <CardDescription>
                  See how proposals are mapped to specific geographic regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden">
                  <LandMap parcels={mockLandParcels} proposals={mockProposals} interactive={false} />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Connected User Dashboard */
          <div className="space-y-8">
            {selectedView === 'map' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Land Parcels & Active Proposals</h2>
                  <p className="text-gray-600">View proposals affecting your properties and cast your votes</p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="h-96 rounded-lg overflow-hidden">
                      <LandMap parcels={mockLandParcels} proposals={mockProposals} interactive={true} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedView === 'proposals' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Proposals</h2>
                  <p className="text-gray-600">Review and vote on community proposals</p>
                </div>
                <div className="grid gap-6">
                  {mockProposals.map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} userRole={userRole} />
                  ))}
                </div>
              </div>
            )}

            {selectedView === 'create' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Proposal</h2>
                  <p className="text-gray-600">Submit a new proposal for community consideration</p>
                </div>
                <CreateProposal userRole={userRole} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">LandVote</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering communities through verified land-based governance
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>Blockchain-Verified</span>
            <span>•</span>
            <span>Transparent</span>
            <span>•</span>
            <span>Democratic</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
