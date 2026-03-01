import { Injectable } from '@angular/core';
import { NodeType } from '../models/nodes.model';

type RuleKey = `${NodeType}->${NodeType}`;

const FORBIDDEN_CONNECTIONS: Partial<Record<RuleKey, string>> = {
  'init->end': 'No se permite conectar el nodo de Inicio con el nodo de Fin.',
  'init->memory': 'No se permite conectar el nodo de Inicio con un nodo de Memoria.',
  'orchestrator->end': 'No se permite conectar un Orquestador con el nodo de Fin.',
};

@Injectable({
  providedIn: 'root',
})
export class RulesNodeService {
  public rules(typeSource: NodeType, typeTarget: NodeType): boolean {
    const source = typeSource.split('_')[0].replace('node-', '') as NodeType;
    const target = typeTarget.split('_')[0].replace('node-', '') as NodeType;
    const message = FORBIDDEN_CONNECTIONS[`${source}->${target}`];

    if (message) {
      alert(message);
      return false;
    }

    return true;
  }
}
