import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
// import { POKEMONS_PER_PAGE } from "../../app/config";
export const getPokemons = createAsyncThunk(
  "pokemons/getPokemons",
  async ({ page, search, type }, { rejectWithValue }) => {
    try {
      let url = `?page=${page}`;
      const a = { type: search.type, select: search.select, q: search.q };
      if (a.select === "Japanese Name" && a.q) {
        url += `&japaneseName=${a.q}`;
      }
      if (a?.select?.includes("Type") && a.type) url += `&type=${a.type}`;
      if (a.select === "Name" && a.q) url += `&name=${a.q}`;
      console.log(url);
      const response = await apiService.get(`/pokemon${url}`);
      return response.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPokemonById = createAsyncThunk(
  "pokemons/getPokemonById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/pokemon/${id}`);
      return response.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPokemon = createAsyncThunk(
  "pokemons/addPokemon",
  async ({ name, id, imgUrl, types }, { rejectWithValue }) => {
    try {
      let url = "/pokemons";
      await apiService.post(url, { name, id, url: imgUrl, types });
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPokemon = createAsyncThunk(
  "pokemons/editPokemon",
  async ({ name, id, url, types }, { rejectWithValue }) => {
    try {
      let url = `/pokemons/${id}`;
      await apiService.put(url, { name, url, types });
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePokemon = createAsyncThunk(
  "pokemons/deletePokemon",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      let url = `/pokemons/${id}`;
      await apiService.delete(url);
      dispatch(getPokemonById());
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    pokemons: [],
    pokemon: {
      previousPokemon: null,
      pokemon: null,
      nextPokemon: null,
    },
    search: "",
    page: 1,
  },
  reducers: {
    changePage: (state, action) => {
      if (action.payload) {
        state.page = action.payload;
      } else {
        state.page += 1;
      }
    },
    typeQuery: (state, action) => {
      state.type = action.payload;
    },
    searchQuery: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [getPokemons.pending]: (state, action) => {
      state.loading = true;
      state.errorMessage = "";
    },
    [getPokemonById.pending]: (state) => {
      state.loading = true;
      state.errorMessage = "";
    },

    [addPokemon.pending]: (state) => {
      state.loading = true;
      state.errorMessage = "";
    },
    [deletePokemon.pending]: (state) => {
      state.loading = true;
      state.errorMessage = "";
    },
    [editPokemon.pending]: (state) => {
      state.loading = true;
      state.errorMessage = "";
    },
    [getPokemons.fulfilled]: (state, action) => {
      state.loading = false;
      const { search, type } = state;
      if ((search || type) && state.page === 1) {
        state.pokemons = action.payload.data;
      } else {
        state.pokemons = [...state.pokemons, ...action.payload.data];
      }
    },
    [getPokemonById.fulfilled]: (state, action) => {
      state.loading = false;
      const key = Object.keys(state.pokemon);
      key.forEach((e, i) => (state.pokemon[e] = action.payload[i]));
      // state.pokemon = action.payload;
    },
    [addPokemon.fulfilled]: (state) => {
      state.loading = false;
    },
    [deletePokemon.fulfilled]: (state) => {
      state.loading = false;
    },
    [editPokemon.fulfilled]: (state) => {
      state.loading = true;
    },
    [getPokemons.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [getPokemonById.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },

    [addPokemon.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [deletePokemon.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [editPokemon.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
  },
});

const { actions, reducer } = pokemonSlice;
export const { changePage, searchQuery, typeQuery } = actions;
export default reducer;
