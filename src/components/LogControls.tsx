import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Play, 
  Pause, 
  Square, 
  Trash2, 
  Download, 
  Search,
  Clock,
  ScrollText,
  Filter
} from 'lucide-react';

interface LogControlsProps {
  isStreaming: boolean;
  onToggleStream: () => void;
  onStop: () => void;
  onClear: () => void;
  onExport: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showTimestamps: boolean;
  onToggleTimestamps: () => void;
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
  logLevel: string;
  onLogLevelChange: (level: string) => void;
  totalLogs: number;
  filteredLogs: number;
}

export function LogControls({
  isStreaming,
  onToggleStream,
  onStop,
  onClear,
  onExport,
  searchTerm,
  onSearchChange,
  showTimestamps,
  onToggleTimestamps,
  autoScroll,
  onToggleAutoScroll,
  logLevel,
  onLogLevelChange,
  totalLogs,
  filteredLogs
}: LogControlsProps) {
  return (
    <div className="space-y-4 p-4 bg-card border rounded-lg">
      {/* Stream Controls */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <ScrollText className="w-4 h-4" />
          Log Controls
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {filteredLogs} / {totalLogs} logs
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant={isStreaming ? "default" : "outline"}
          size="sm"
          onClick={onToggleStream}
          className="gap-2"
        >
          {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isStreaming ? 'Pause' : 'Start'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onStop}
          disabled={!isStreaming}
          className="gap-2"
        >
          <Square className="w-4 h-4" />
          Stop
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={totalLogs === 0}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search logs
          </label>
          <Input
            placeholder="Search messages, containers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Log level
          </label>
          <Select value={logLevel} onValueChange={onLogLevelChange}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Show timestamps
          </label>
          <Switch
            checked={showTimestamps}
            onCheckedChange={onToggleTimestamps}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <ScrollText className="w-4 h-4" />
            Auto-scroll
          </label>
          <Switch
            checked={autoScroll}
            onCheckedChange={onToggleAutoScroll}
          />
        </div>
      </div>
    </div>
  );
}