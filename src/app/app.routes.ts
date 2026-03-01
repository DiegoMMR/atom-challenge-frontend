import { Routes } from '@angular/router';
import { FlowCanvas } from './features/flow-editor/components/flow-canvas/flow-canvas';
import { LiveChat } from './features/live-chat/live-chat';

export const routes: Routes = [
  {
    path: '',
    component: FlowCanvas,
  },
  {
    path: 'chat',
    component: LiveChat,
  },
];
