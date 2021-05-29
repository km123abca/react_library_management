export const initialState = {
  basket: [],
  returnBasket: [],
  user: null,
};
export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => (amount += item.price), 0);
};
export const getReturnBasketCount = (returnBasket, id, checkoutID) => {
  return returnBasket.filter((x) => x.id == id && x.checkoutID == checkoutID)
    .length;
};
const getLocalData = (state) => {
  let localData = [];
  if (state.user) {
    let localDataString = localStorage.getItem(state.user.email);
    if (localDataString) localData = JSON.parse(localDataString);
  } else {
    let localDataString = localStorage.getItem("guest");
    if (localDataString) localData = JSON.parse(localDataString);
  }
  return localData;
};
const getLocalDataExtended = (state) => {
  let localData = [];
  if (state.user) {
    let localDataString = localStorage.getItem(state.user.email + "_extended");
    if (localDataString) localData = JSON.parse(localDataString);
  } else {
    let localDataString = localStorage.getItem("guest_extended");
    if (localDataString) localData = JSON.parse(localDataString);
  }
  return localData;
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_BASKET_ON_RELOAD":
      return {
        ...state,
        basket: getLocalData(state),
      };
    case "SET_RETURN_BASKET_ON_RELOAD":
      return {
        ...state,
        returnBasket: getLocalDataExtended(state),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_RETURN_BASKET":
      if (state.user) {
        localStorage.setItem(
          state.user.email + "_extended",
          JSON.stringify([...state.returnBasket, action.item])
        );
      } else {
        localStorage.setItem(
          "guest_extended",
          JSON.stringify([...state.returnBasket, action.item])
        );
      }
      return { ...state, returnBasket: [...state.returnBasket, action.item] };
    case "ADD_TO_BASKET":
      if (state.user) {
        localStorage.setItem(
          state.user.email,
          JSON.stringify([...state.basket, action.item])
        );
      } else {
        localStorage.setItem(
          "guest",
          JSON.stringify([...state.basket, action.item])
        );
      }
      return { ...state, basket: [...state.basket, action.item] };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else
        console.warn(
          `The provided id, ${action.id} does not belong to any product in the basket`
        );
      if (state.user) {
        localStorage.setItem(state.user.email, JSON.stringify(newBasket));
      } else {
        localStorage.setItem("guest", JSON.stringify(newBasket));
      }
      return { ...state, basket: newBasket };
    case "REMOVE_FROM_RETURN_BASKET":
      newBasket = [...state.returnBasket];
      index = state.returnBasket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else
        console.warn(
          `The provided id, ${action.id} does not belong to any product in the basket`
        );
      if (state.user) {
        localStorage.setItem(
          state.user.email + "_extended",
          JSON.stringify(newBasket)
        );
      } else {
        localStorage.setItem("guest_extended", JSON.stringify(newBasket));
      }
      return { ...state, returnBasket: newBasket };
    case "CLEAR_BASKET":
      if (state.user) {
        localStorage.setItem(state.user.email, []);
      } else {
        localStorage.setItem("guest", []);
      }
      return { ...state, basket: [] };

    case "CLEAR_RETURN_BASKET":
      if (state.user) {
        localStorage.setItem(state.user.email + "_extended", []);
      } else {
        localStorage.setItem("guest_extended", []);
      }
      return { ...state, returnBasket: [] };
    default:
      return { ...state };
  }
}
export default reducer;
