interface StoreState {
  grid: string | number | Storage,
  time: number | null,
  food: number | null
}


export const state = () : StoreState => ({
  grid: localStorage.getItem("grid") || 5,
  time: null,
  food: null
});

export const mutations = {
  SET_GRID(state: StoreState, data: number) {
    state.grid = data;
    localStorage.setItem("grid", state.grid.toString());
  },
  SET_TIME(state: StoreState, data: number) {
    state.time = data;
  },
  SET_FOOD(state: StoreState, data: number) {
    state.food = data;
  }
};

export const actions = {};
