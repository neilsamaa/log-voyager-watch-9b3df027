import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Container, RefreshCw } from 'lucide-react';

interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  created: string;
}

interface ContainerSelectorProps {
  containers: DockerContainer[];
  selectedContainer: string | null;
  onContainerSelect: (containerId: string | null) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function ContainerSelector({
  containers,
  selectedContainer,
  onContainerSelect,
  onRefresh,
  isRefreshing
}: ContainerSelectorProps) {
  const [filterText, setFilterText] = useState('');

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(filterText.toLowerCase()) ||
    container.image.toLowerCase().includes(filterText.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-primary text-primary-foreground';
      case 'stopped': return 'bg-destructive text-destructive-foreground';
      case 'paused': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const selectedContainerData = containers.find(c => c.id === selectedContainer);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Container className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Docker Containers</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter containers</label>
          <Input
            placeholder="Search by name or image..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select container</label>
          <Select
            value={selectedContainer || ''}
            onValueChange={(value) => onContainerSelect(value || null)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Choose a container..." />
            </SelectTrigger>
            <SelectContent>
              {filteredContainers.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No containers found
                </div>
              ) : (
                filteredContainers.map((container) => (
                  <SelectItem key={container.id} value={container.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{container.name}</span>
                      <Badge className={`ml-2 text-xs ${getStatusColor(container.status)}`}>
                        {container.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedContainerData && (
        <div className="p-4 bg-card border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-primary">{selectedContainerData.name}</h3>
            <Badge className={getStatusColor(selectedContainerData.status)}>
              {selectedContainerData.status}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Image:</span>
              <span className="font-mono">{selectedContainerData.image}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Container ID:</span>
              <span className="font-mono text-xs">{selectedContainerData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span>{selectedContainerData.created}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}