const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async ({ url, options }) => {
    console.log("hi" , url);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("error:", error);
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    toCurrency: null,
    fromCurrency: null,
    currencies: [],
    pending: false,
    error: null,
  },
  reducers: {
    setFromCurrency: (state, action) => {      
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.pending = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error;
      });
  },
});

export const { setFromCurrency, setToCurrency } = currencySlice.actions;
export default currencySlice.reducer;
