
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FileText, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface CreateProposalProps {
  userRole: 'landowner' | 'proposer' | 'validator' | null;
}

const CreateProposal = ({ userRole }: CreateProposalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !region || !deadline || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate proposal creation
    toast({
      title: "Proposal Created",
      description: `Your proposal "${title}" has been submitted for review and will be published to the blockchain.`,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setRegion("");
    setDeadline(undefined);
    setCategory("");
  };

  const proposalCategories = [
    "Zoning Amendment",
    "Infrastructure Development", 
    "Environmental Protection",
    "Public Transportation",
    "Housing Policy",
    "Commercial Development",
    "Green Spaces",
    "Public Safety"
  ];

  const regions = [
    "Downtown District",
    "Riverfront Area", 
    "Northern Sector",
    "Southern Hills",
    "East Industrial Zone",
    "West Residential"
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Role Check */}
      {userRole !== 'proposer' && userRole !== 'validator' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-yellow-800">
              <FileText className="h-5 w-5" />
              <div>
                <p className="font-medium">Proposal Creation Limited</p>
                <p className="text-sm">Only certified proposers and validators can create new proposals. Contact your local government to request proposer status.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Proposal Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Create New Proposal</span>
          </CardTitle>
          <CardDescription>
            Submit a new proposal for community consideration. All proposals will be reviewed before being published to the blockchain.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Downtown Zoning Amendment for Mixed Use Development"
                required
                disabled={userRole !== 'proposer' && userRole !== 'validator'}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={userRole !== 'proposer' && userRole !== 'validator'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proposal category" />
                </SelectTrigger>
                <SelectContent>
                  {proposalCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region">Affected Region</Label>
              <Select value={region} onValueChange={setRegion} disabled={userRole !== 'proposer' && userRole !== 'validator'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select affected region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((reg) => (
                    <SelectItem key={reg} value={reg}>
                      <MapPin className="h-4 w-4 mr-2 inline" />
                      {reg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a comprehensive description of the proposal, including its purpose, expected impact, and implementation details..."
                rows={6}
                required
                disabled={userRole !== 'proposer' && userRole !== 'validator'}
              />
            </div>

            {/* Voting Deadline */}
            <div className="space-y-2">
              <Label>Voting Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    disabled={userRole !== 'proposer' && userRole !== 'validator'}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a deadline</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={userRole !== 'proposer' && userRole !== 'validator'}
              >
                <FileText className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setRegion("");
                  setDeadline(undefined);
                  setCategory("");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-blue-800">
              <h4 className="font-medium mb-1">Proposal Review Process</h4>
              <ul className="text-sm space-y-1">
                <li>• Proposals are reviewed by validators within 24-48 hours</li>
                <li>• Valid proposals are published to the blockchain for voting</li>
                <li>• Landowners in affected regions receive notifications</li>
                <li>• Voting period begins once proposal is approved</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProposal;
