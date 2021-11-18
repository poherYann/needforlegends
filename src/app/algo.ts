export class Algo {
  aggressive: boolean;
  objective: boolean;
  safe: boolean;
  aggressivePlayer: number;
  objectivePlayer: number;
  safePlayer: number;
  all: boolean;

  constructor(agressive?: boolean, objective?: boolean, safe?: boolean, aggressivePlayer?: number, objectivePlayer?: number, safePlayer?: number,all?:boolean) {
    this.aggressive = agressive === undefined ? false : agressive;
    this.objective = objective === undefined ? false : objective;
    this.safe = safe === undefined ? false : safe;
    this.safePlayer = safePlayer === undefined ? 0 : safePlayer;
    this.aggressivePlayer = aggressivePlayer === undefined ? 0 : aggressivePlayer;
    this.objectivePlayer = objectivePlayer === undefined ? 0 : objectivePlayer;
    this.all = all === undefined ? false : all;

  }
}
