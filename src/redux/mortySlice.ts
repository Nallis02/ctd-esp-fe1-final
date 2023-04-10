import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface Character {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
export interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [string];
  url: string;
  created: string;
}
interface InitialStateType {
  input: string;
  data: Info;
  personajes: Personaje[];
  favoritos: number[];
  loading: boolean;
  error: boolean;
}
export const getCharacterMorty = createAsyncThunk(
  "personaje/getCharacterMorty",
  async (page: number) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&limit=20`
    );
    const parseRes = await response.json();
    if (!response.ok) {
      throw new Error("Pagina no encontrada");
    }
    return parseRes;
  }
);

const getPersonajesFiltrados = async (name: string, page: number) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
  if (response.ok) {
      const data = await response.json();
      return data
  } else {
      throw new Error('Pagina no encontrada')
  }
}

export const getPersonajesName = createAsyncThunk(
  'personaje/getPersonajesName',
  async ({name, page}:{name: string, page: number}) => {
      const response = await getPersonajesFiltrados(name, page)
      return response
  }
)

const initialState: InitialStateType = {
  input: "",
  data: { count: 0, pages: 1, next: "", prev: "" },
  personajes: [],
  loading: false,
  favoritos: [],
  error: false,
}

const characterSlice = createSlice({
  name: "personaje",
  initialState,
  reducers: {
    buscarPersonaje: (state, action) => {
      state.input = action.payload
    },
    limpiarBusquedaPersonaje: (state) => {
      state.input = ""
    },
    agregarFvoritos: (state, action) => {
      state.favoritos = action.payload
    },
    limpiarFavoritos: (state) => {
      state.favoritos = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterMorty.pending, (state) => {
        state.loading = true
        state.personajes = initialState.personajes;
        state.error = initialState.error
      })
      .addCase(getCharacterMorty.fulfilled, (state, action) => {
        state.loading = false
        state.personajes = action.payload.results
        state.data = action.payload.info
        state.error = initialState.error
      })
      .addCase(getCharacterMorty.rejected, (state) => {
        state.loading = false
        state.personajes = []
        state.error = initialState.error
      })
      .addCase(getPersonajesName.pending, (state) => {
        state.loading = true
        state.personajes = []
        state.error = initialState.error
      })
      .addCase(getPersonajesName.fulfilled, (state, action) => {
        state.loading = false
        state.personajes = action.payload.results
        state.data = action.payload.info
        state.error = initialState.error
      })
      .addCase(getPersonajesName.rejected, (state) => {
        state.data.pages = 1
        state.loading = false
        state.error = true
        state.personajes = []
      })
  },
})
export const { buscarPersonaje, agregarFvoritos, limpiarFavoritos, limpiarBusquedaPersonaje } = characterSlice.actions
export default characterSlice.reducer



