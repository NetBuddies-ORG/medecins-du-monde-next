import {
  DependencyList,
  useEffect,
} from 'react';

export function useAsyncEffect(effect: () => Promise<unknown>, deps: DependencyList)
{
    useEffect(() =>
    {
        const task = effect();
        return () => { task.then(r => r instanceof Function && r()); }
    }, deps)
}