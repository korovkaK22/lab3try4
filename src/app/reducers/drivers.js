import mockDrivers from '../../misc/mocks/mockDrivers';

const initialState = {
  drivers: mockDrivers,
  isRead: false,
  isEdit: false,
  isEdd:false,
  newdriverID:0
};

export default function driversReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DRIVER': {
      const newDriver = action.payload;
      return {
        ...state,
        drivers: [...state.drivers, newDriver],
      };
    }
    case 'SET_IS_READ_TRUE': { 
      return {
        ...state,
        isRead: true,
      };
    }
    case 'SET_IS_READ_FALSE': { 
      return {
        ...state,
        isRead: false,
      };
    }
    case 'SET_IS_EDIT_TRUE': { 
      return {
        ...state,
        isEdit: true,
      };
    }
    case 'SET_IS_EDIT_FALSE': { 
      return {
        ...state,
        isEdit: false,
      };
    }
    case 'SET_IS_EDD_TRUE': { 
      return {
        ...state,
        isEdd: true,
      };
    }
    case 'SET_IS_EDD_FALSE': { 
      return {
        ...state,
        isEdd: false,
      };
    }
    case 'GET_DRIVER_BY_INDEX': {
      const index = action.payload;
      const driver = state.drivers[index]; 
      return {
        ...state,
        selectedDriver: driver, 
      };
    }
    case 'UPDATE_DRIVER': {
      const { index, data } = action.payload;
      const updatedDrivers = [...state.drivers];
      updatedDrivers[index] = { ...updatedDrivers[index], ...data };
      return {
        ...state,
        drivers: updatedDrivers,
      };
    }
    case 'GET_NEW_DRIVER_ID': {
      const maxIndex = (state.drivers.length)+1
      return {
        ...state,
        newdriverID: maxIndex,
      };
    }
    
    
    default:
      return state;
  }
}
