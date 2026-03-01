export interface NodePort {
  id: string;
  schemaRef?: string;
}

export interface NodePorts {
  in: NodePort[];
  out: NodePort[];
  memory?: INodeConfig[];
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface INodeConfig {
  id: string;
  typeNode: string;
  type: any;
  label?: string;
  position: NodePosition;
  ports: NodePorts;
  config?: Record<string, any>;
}

export interface FlowConfig {
  nodes: INodeConfig[];
}
