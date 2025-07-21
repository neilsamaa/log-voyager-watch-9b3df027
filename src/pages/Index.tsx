import { useState, useEffect } from 'react';
import { ContainerSelector } from '@/components/ContainerSelector';
import { LogControls } from '@/components/LogControls';
import { LogViewer } from '@/components/LogViewer';
import { useToast } from '@/hooks/use-toast';
import { Container } from 'lucide-react';

interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused';
  created: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'error' | 'warning' | 'debug';
  message: string;
  container: string;
}

// Simulated Docker containers
const mockContainers: DockerContainer[] = [
  {
    id: 'c1a2b3c4d5e6',
    name: 'nginx-web-server',
    image: 'nginx:latest',
    status: 'running',
    created: '2024-01-15 10:30:00'
  },
  {
    id: 'f7g8h9i0j1k2',
    name: 'postgres-db',
    image: 'postgres:15',
    status: 'running',
    created: '2024-01-15 09:15:00'
  },
  {
    id: 'l3m4n5o6p7q8',
    name: 'redis-cache',
    image: 'redis:7-alpine',
    status: 'paused',
    created: '2024-01-14 16:45:00'
  },
  {
    id: 'r9s0t1u2v3w4',
    name: 'node-app',
    image: 'node:18-alpine',
    status: 'stopped',
    created: '2024-01-14 14:20:00'
  }
];

// Simulated log messages
const sampleLogMessages = [
  'Server started on port 3000',
  'Database connection established',
  'User authentication successful',
  'Cache hit for key: user_session_123',
  'Processing incoming request',
  'Error: Connection timeout to database',
  'Warning: High memory usage detected',
  'Debug: SQL query executed in 45ms',
  'Info: Scheduled backup completed',
  'Request processed successfully',
  'Session expired for user ID 456',
  'Warning: Disk space running low',
  'Error: Failed to connect to external API',
  'Info: Configuration reloaded',
  'Debug: Cache invalidated for key: product_list'
];

const Index = () => {
  const { toast } = useToast();
  const [containers] = useState<DockerContainer[]>(mockContainers);
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [logLevel, setLogLevel] = useState('all');

  // Simulate log streaming
  useEffect(() => {
    if (!isStreaming || !selectedContainer) return;

    const interval = setInterval(() => {
      const container = containers.find(c => c.id === selectedContainer);
      if (!container) return;

      const levels: Array<'info' | 'error' | 'warning' | 'debug'> = ['info', 'error', 'warning', 'debug'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const randomMessage = sampleLogMessages[Math.floor(Math.random() * sampleLogMessages.length)];
      
      const newLog: LogEntry = {
        id: Date.now().toString() + Math.random(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        level: randomLevel,
        message: randomMessage,
        container: container.name
      };

      setLogs(prev => [...prev, newLog]);
    }, Math.random() * 2000 + 500); // Random interval between 500ms - 2.5s

    return () => clearInterval(interval);
  }, [isStreaming, selectedContainer, containers]);

  const handleContainerSelect = (containerId: string | null) => {
    setSelectedContainer(containerId);
    setLogs([]); // Clear logs when switching containers
    setIsStreaming(false);
    
    if (containerId) {
      const container = containers.find(c => c.id === containerId);
      toast({
        title: "Container Selected",
        description: `Ready to stream logs from ${container?.name}`,
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Containers Refreshed",
        description: "Container list has been updated",
      });
    }, 1000);
  };

  const handleToggleStream = () => {
    if (!selectedContainer) {
      toast({
        title: "No Container Selected",
        description: "Please select a container first",
        variant: "destructive"
      });
      return;
    }

    const newStreamingState = !isStreaming;
    setIsStreaming(newStreamingState);
    
    toast({
      title: newStreamingState ? "Streaming Started" : "Streaming Paused",
      description: newStreamingState ? "Real-time logs are now being displayed" : "Log streaming has been paused",
    });
  };

  const handleStop = () => {
    setIsStreaming(false);
    toast({
      title: "Streaming Stopped",
      description: "Log streaming has been stopped",
    });
  };

  const handleClear = () => {
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All log entries have been removed",
    });
  };

  const handleExport = () => {
    const logText = filteredLogs.map(log => 
      `${log.timestamp} [${log.level.toUpperCase()}] ${log.container}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docker-logs-${selectedContainer}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Logs Exported",
      description: "Log file has been downloaded",
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.container.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Docker Log Viewer
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze your container logs in real-time
          </p>
        </div>

        {/* Container Selection */}
        <ContainerSelector
          containers={containers}
          selectedContainer={selectedContainer}
          onContainerSelect={handleContainerSelect}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {selectedContainer && (
          <>
            {/* Log Controls */}
            <LogControls
              isStreaming={isStreaming}
              onToggleStream={handleToggleStream}
              onStop={handleStop}
              onClear={handleClear}
              onExport={handleExport}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              showTimestamps={showTimestamps}
              onToggleTimestamps={() => setShowTimestamps(!showTimestamps)}
              autoScroll={autoScroll}
              onToggleAutoScroll={() => setAutoScroll(!autoScroll)}
              logLevel={logLevel}
              onLogLevelChange={setLogLevel}
              totalLogs={logs.length}
              filteredLogs={filteredLogs.length}
            />

            {/* Log Viewer */}
            <div className="bg-card border rounded-lg overflow-hidden" style={{ height: '600px' }}>
              <LogViewer
                logs={filteredLogs}
                isStreaming={isStreaming}
                searchTerm={searchTerm}
                showTimestamps={showTimestamps}
                autoScroll={autoScroll}
              />
            </div>
          </>
        )}

        {!selectedContainer && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Container className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Select a Container</h3>
              <p className="text-muted-foreground">
                Choose a Docker container from the list above to start viewing its logs
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
