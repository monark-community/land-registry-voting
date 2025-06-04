
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConnectWalletProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectWallet = ({ isConnected, onConnect, onDisconnect }: ConnectWalletProps) => {
  const { toast } = useToast();

  const handleConnect = () => {
    // Simulate wallet connection
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your Web3 wallet",
    });
    onConnect();
  };

  const handleDisconnect = () => {
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
    onDisconnect();
  };

  if (isConnected) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">0x1234...5678</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    3 Parcels
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    <User className="h-3 w-3 mr-1" />
                    Landowner
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDisconnect}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
    >
      <Wallet className="h-4 w-4 mr-2" />
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
