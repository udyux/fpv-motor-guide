import { computed } from 'vue';
import { useRouter, useRoute, LocationQueryRaw, LocationQueryValueRaw } from 'vue-router';
import _omit from 'lodash.omit';

type CastQueryOptions = { arrays?: string[]; booleans?: string[]; numbers?: string[] };

export default () => {
  const $router = useRouter();
  const $route = useRoute();

  function updateQueryKey(
    queryKey: string,
    value: LocationQueryValueRaw | boolean,
    removeKey?: boolean,
    useReplace?: boolean
  ) {
    const queryValue = value === null ? value : String(value);
    const query = removeKey ? _omit($route.query, [queryKey]) : { ...$route.query, [queryKey]: queryValue };

    if (useReplace) $router.replace({ query });
    else $router.push({ query });
  }

  function updateQuery(newQuery: LocationQueryRaw, replaceQuery?: boolean, useReplace?: boolean) {
    const query = replaceQuery ? newQuery : { ...$route.query, ...newQuery };
    if (useReplace) $router.replace({ query });
    else $router.push({ query });
  }

  function castQuery<T = LocationQueryRaw>({ numbers = [], booleans = [], arrays = [] }: CastQueryOptions = {}) {
    return computed<LocationQueryRaw & Partial<T>>(() =>
      Object.entries($route.query).reduce((queryParams, [key, value]) => {
        if (numbers.includes(key)) return { ...queryParams, [key]: Number(value) };
        if (booleans.includes(key)) return { ...queryParams, [key]: String(value) === 'true' };
        if (arrays.includes(key)) return { ...queryParams, [key]: !Array.isArray(value) ? [value] : value };
        return { ...queryParams, [key]: String(value) };
      }, {})
    );
  }

  return { updateQuery, updateQueryKey, castQuery };
};
