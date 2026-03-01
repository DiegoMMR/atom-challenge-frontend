export type NodeType =
  | 'memory'
  | 'orchestrator'
  | 'validator'
  | 'specialist'
  | 'generic'
  | 'init'
  | 'end';

export interface NodeTheme {
  cardBorder: string;
  headerBg: string;
  headerBorder: string;
  iconBg: string;
  labelColor: string;
  pulseColor: string;
  dotColor: string;
  bar1: string;
  bar2: string;
}

export type HandlePosition = 'top' | 'right' | 'bottom' | 'left';
export type HandleType = 'source' | 'target';

export interface NodeHandleConfig {
  position: HandlePosition;
  type: HandleType;
}

/** true = usa el tipo por defecto (right/bottom → source, left/top → target) */
export type NodeHandleValue = true | NodeHandleConfig;

export type NodeHandles = Partial<Record<HandlePosition, NodeHandleValue>>;

export interface NodeCatalogItem {
  type: NodeType;
  label: string;
  description: string;
  bgColor: string;
  hoverBorder: string;
  iconPath: string;
  theme: NodeTheme;
  handles: NodeHandles;
}

export const NODE_TYPES: NodeType[] = [
  'init',
  'memory',
  'orchestrator',
  'validator',
  'specialist',
  'generic',
  'end',
];

export const NODE_META: Record<NodeType, Omit<NodeCatalogItem, 'type'>> = {
  init: {
    label: 'Inicio',
    description: 'Punto de entrada del flujo',
    bgColor: 'bg-teal-600 group-hover:bg-teal-500',
    hoverBorder: 'hover:border-teal-500',
    iconPath: 'M5 3l14 9-14 9V3z',
    handles: { bottom: { position: 'bottom', type: 'source' } },
    theme: {
      cardBorder: 'border-teal-700/60',
      headerBg: 'bg-teal-700/20',
      headerBorder: 'border-teal-700/40',
      iconBg: 'bg-teal-600/80',
      labelColor: 'text-teal-200',
      pulseColor: 'bg-teal-400',
      dotColor: 'bg-teal-500',
      bar1: 'bg-teal-600/50',
      bar2: 'bg-teal-500/30',
    },
  },
  memory: {
    label: 'Memory',
    description: 'Almacenamiento de contexto',
    bgColor: 'bg-purple-600 group-hover:bg-purple-500',
    hoverBorder: 'hover:border-purple-500',
    iconPath:
      'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    handles: {
      left: { position: 'left', type: 'target' },
    },
    theme: {
      cardBorder: 'border-purple-700/60',
      headerBg: 'bg-purple-700/20',
      headerBorder: 'border-purple-700/40',
      iconBg: 'bg-purple-600/80',
      labelColor: 'text-purple-200',
      pulseColor: 'bg-purple-400',
      dotColor: 'bg-purple-500',
      bar1: 'bg-purple-600/50',
      bar2: 'bg-purple-500/30',
    },
  },
  orchestrator: {
    label: 'Orquestador',
    description: 'Coordina el flujo',
    bgColor: 'bg-indigo-600 group-hover:bg-indigo-500',
    hoverBorder: 'hover:border-indigo-500',
    iconPath:
      'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    handles: {
      left: { position: 'left', type: 'target' },
      right: { position: 'right', type: 'source' },
    },
    theme: {
      cardBorder: 'border-indigo-700/60',
      headerBg: 'bg-indigo-700/20',
      headerBorder: 'border-indigo-700/40',
      iconBg: 'bg-indigo-600/80',
      labelColor: 'text-indigo-200',
      pulseColor: 'bg-indigo-400',
      dotColor: 'bg-indigo-500',
      bar1: 'bg-indigo-600/50',
      bar2: 'bg-indigo-500/30',
    },
  },
  validator: {
    label: 'Validador',
    description: 'Verifica condiciones',
    bgColor: 'bg-amber-600 group-hover:bg-amber-500',
    hoverBorder: 'hover:border-amber-500',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    handles: {
      left: { position: 'left', type: 'target' },
      right: { position: 'right', type: 'source' },
    },
    theme: {
      cardBorder: 'border-amber-700/60',
      headerBg: 'bg-amber-700/20',
      headerBorder: 'border-amber-700/40',
      iconBg: 'bg-amber-600/80',
      labelColor: 'text-amber-200',
      pulseColor: 'bg-amber-400',
      dotColor: 'bg-amber-500',
      bar1: 'bg-amber-600/50',
      bar2: 'bg-amber-500/30',
    },
  },
  specialist: {
    label: 'Especialista',
    description: 'Tarea experta',
    bgColor: 'bg-emerald-600 group-hover:bg-emerald-500',
    hoverBorder: 'hover:border-emerald-500',
    iconPath:
      'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    handles: {
      left: { position: 'left', type: 'target' },
      right: { position: 'right', type: 'source' },
    },
    theme: {
      cardBorder: 'border-emerald-700/60',
      headerBg: 'bg-emerald-700/20',
      headerBorder: 'border-emerald-700/40',
      iconBg: 'bg-emerald-600/80',
      labelColor: 'text-emerald-200',
      pulseColor: 'bg-emerald-400',
      dotColor: 'bg-emerald-500',
      bar1: 'bg-emerald-600/50',
      bar2: 'bg-emerald-500/30',
    },
  },
  generic: {
    label: 'Genérico',
    description: 'Nodo personalizable',
    bgColor: 'bg-gray-600 group-hover:bg-gray-500',
    hoverBorder: 'hover:border-gray-400',
    iconPath:
      'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    handles: {
      left: { position: 'left', type: 'target' },
      right: { position: 'right', type: 'source' },
    },
    theme: {
      cardBorder: 'border-gray-600/60',
      headerBg: 'bg-gray-700/20',
      headerBorder: 'border-gray-600/40',
      iconBg: 'bg-gray-600/80',
      labelColor: 'text-gray-300',
      pulseColor: 'bg-gray-400',
      dotColor: 'bg-gray-500',
      bar1: 'bg-gray-600/50',
      bar2: 'bg-gray-500/30',
    },
  },
  end: {
    label: 'Fin',
    description: 'Punto de salida del flujo',
    bgColor: 'bg-rose-600 group-hover:bg-rose-500',
    hoverBorder: 'hover:border-rose-500',
    iconPath: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10h6M9 14h6',
    handles: { top: { position: 'top', type: 'target' } },
    theme: {
      cardBorder: 'border-rose-700/60',
      headerBg: 'bg-rose-700/20',
      headerBorder: 'border-rose-700/40',
      iconBg: 'bg-rose-600/80',
      labelColor: 'text-rose-200',
      pulseColor: 'bg-rose-400',
      dotColor: 'bg-rose-500',
      bar1: 'bg-rose-600/50',
      bar2: 'bg-rose-500/30',
    },
  },
};
