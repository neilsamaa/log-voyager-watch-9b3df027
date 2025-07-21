import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'error' | 'warning' | 'debug';
  message: string;
  container: string;
}

interface LogViewerProps {
  logs: LogEntry[];
  isStreaming: boolean;
  searchTerm: string;
  showTimestamps: boolean;
  autoScroll: boolean;
}

export function LogViewer({ 
  logs, 
  isStreaming, 
  searchTerm, 
  showTimestamps, 
  autoScroll 
}: LogViewerProps) {
  const logEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter(log => 
    searchTerm === '' || 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.container.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-log-error';
      case 'warning': return 'text-log-warning';
      case 'info': return 'text-log-info';
      case 'debug': return 'text-log-debug';
      default: return 'text-log-foreground';
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      case 'debug': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
          <span className="text-sm font-medium">
            {isStreaming ? 'Streaming' : 'Stopped'} • {filteredLogs.length} entries
          </span>
        </div>
        {searchTerm && (
          <Badge variant="secondary" className="text-xs">
            Filtered: {filteredLogs.length} of {logs.length}
          </Badge>
        )}
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-log-background font-mono text-sm"
      >
        <div className="p-4 space-y-1">
          {filteredLogs.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {searchTerm ? 'No logs match your search' : 'No logs available'}
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-start gap-3 py-1 px-2 rounded hover:bg-muted/30 transition-colors group"
              >
                {showTimestamps && (
                  <span className="text-log-timestamp text-xs min-w-[140px] pt-0.5">
                    {log.timestamp}
                  </span>
                )}
                <Badge 
                  variant={getLevelBadgeVariant(log.level)}
                  className="text-xs min-w-[60px] justify-center"
                >
                  {log.level.toUpperCase()}
                </Badge>
                <span className="text-log-container text-xs min-w-[120px] pt-0.5 truncate">
                  {log.container}
                </span>
                <span className={`flex-1 leading-relaxed ${getLevelColor(log.level)}`}>
                  {searchTerm ? (
                    log.message.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => 
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <span key={i} className="bg-primary/20 text-primary px-1 rounded">
                          {part}
                        </span>
                      ) : part
                    )
                  ) : (
                    log.message
                  )}
                </span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}