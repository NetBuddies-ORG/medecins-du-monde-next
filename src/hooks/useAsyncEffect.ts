import {
  DependencyList,
  useEffect,
} from 'react';

export function useAsyncEffect(effect: () => Promise<unknown>, deps: DependencyList)
{
    useEffect(() =>
    {
        let task = effect();
        return () => { task.then(r => r instanceof Function && r()); }
    }, deps)
}