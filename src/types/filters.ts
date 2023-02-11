export const stateFilters = ['open', 'closed'] as const;

export type StateFilter = (typeof stateFilters)[number];

export type Filters = {
  search: string;
  state: StateFilter | null;
};
