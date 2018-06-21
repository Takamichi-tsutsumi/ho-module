function generateTypes(resourceName) {
  const s = resourceName.toUpperCase()

  return {
    LOAD_START: `@RESOURC_FETCHER/LOAD_START/${s}`,
    LOAD_SUCCESS: `@RESOURC_FETCHER/LOAD_SUCCESS/${s}`,
    LOAD_FAIL: `@RESOURC_FETCHER/LOAD_FAIL/${s}`,
  }
}

function generateActionCreators(types) {
  return {
    loadStart: ({ payload, meta }) => ({
      type: types.LOAD_START,
      payload,
      meta,
    }),
    loadSuccess: ({ payload, meta }) => ({
      type: types.LOAD_SUCCESS,
      payload,
      meta,
    }),
    loadFail: ({ payload, meta }) => ({
      type: types.LOAD_FAIL,
      error: true,
      payload,
      meta,
    }),
  }
}

const LOADING_STATUS = {
  NOT_LOADED: 'NOT_LOADED',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
}

const initialState = {
  status: LOADING_STATUS.NOT_LOADED,
  error: null,
  data: null,
}

function generateReducer(types) {
  return (state, action) => {
    switch (action.type) {
      case types.LOAD_START:
        return { ...state, status: LOADING_STATUS.LOADING }
      case types.LOAD_SUCCESS:
        return { ...state, status: LOADING_STATUS.LOADED, data: action.payload }
      case types.LOAD_FAIL:
        return {
          ...state,
          status: LOADING_STATUS.NOT_LOADED,
          error: action.payload,
        }
    }
  }
}

export function generateResourceFetchModule(reourceName) {
  if (typeof resourceName !== 'string') {
    throw new Error('Argument must be string.')
  }

  const types = generateTypes(resourceName)
  const actions = generateActionCreators(types)
  const reducer = generateReducer(types)

  return { types, actions, reducer }
}
