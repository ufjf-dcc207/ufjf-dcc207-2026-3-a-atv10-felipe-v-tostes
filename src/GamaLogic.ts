export const INITIAL_CONFIG = {
  tubes: [
    ['🔴', '🔵', '🔴', '🔵'],
    ['🔵', '🔴', '🔵', '🔴'],
    [] // Tubo vazio para movimentação
  ],
  selectedTube: null,
  hasWon: false
};

function checkWin(tubes: string[][]): boolean {
  return tubes.every(tube => {
    if (tube.length === 0) return true;
    if (tube.length !== 4) return false;
    return tube.every(color => color === tube[0]);
  });
}

export function gameReducer(state: any, action: any) {
  switch (action.type) {
    case 'TUBE_CLICK': {
      const tubeIndex = action.payload;
      const { tubes, selectedTube } = state;

      // Se nenhum tubo está selecionado
      if (selectedTube === null) {
        // Não faz nada se clicar em um tubo vazio
        if (tubes[tubeIndex].length === 0) return state;
        
        return {
          ...state,
          selectedTube: tubeIndex
        };
      }

      // Se o usuário clicou no mesmo tubo, deseleciona
      if (selectedTube === tubeIndex) {
        return {
          ...state,
          selectedTube: null
        };
      }

      // Lógica de movimentação entre tubos
      const sourceTube = [...tubes[selectedTube]];
      const targetTube = [...tubes[tubeIndex]];

      // Regras: Tubo de destino não pode estar cheio (max 4 itens)
      if (targetTube.length >= 4) {
        return { ...state, selectedTube: null };
      }

      const itemToMove = sourceTube[sourceTube.length - 1];

      // Move o item
      sourceTube.pop();
      targetTube.push(itemToMove);

      const newTubes = tubes.map((tube: string[], idx: number) => {
        if (idx === selectedTube) return sourceTube;
        if (idx === tubeIndex) return targetTube;
        return tube;
      });

      return {
        ...state,
        tubes: newTubes,
        selectedTube: null,
        hasWon: checkWin(newTubes)
      };
    }

    case 'RESET':
      return INITIAL_CONFIG;

    default:
      return state;
  }
}
