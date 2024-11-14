const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async ({ url, options }) => {
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
export const exchangeCurrency = createAsyncThunk(
  "currency/exchangeCurrency",
  async (url, options) => {
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
    currencies: {},
    exchangeRates: {},
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
    setPending: (state) => {
      state.pending = true;
    },
  },
  extraReducers: (builder) => {
    // handle fetch
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
    //   handle exchange
    builder
      .addCase(exchangeCurrency.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(exchangeCurrency.fulfilled, (state, action) => {
        state.pending = false;
        state.exchangeRates = action.payload;
      })
      .addCase(exchangeCurrency.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error;
      });
  },
});

export const { setFromCurrency, setToCurrency , setPending } = currencySlice.actions;
export default currencySlice.reducer;
