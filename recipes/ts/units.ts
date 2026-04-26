import { Unit } from "./types.js";

export const UNIT_CONVERSIONS: Record<
	string,
	{ to: Unit; factor: number; group: 'weight' | 'volume' | 'discrete' }
> = {
	g: { to: 'g', factor: 1, group: 'weight' },
	kg: { to: 'g', factor: 1000, group: 'weight' },
	lb: { to: 'g', factor: 453.59, group: 'weight' },
	oz: { to: 'g', factor: 28.35, group: 'weight' },
	ml: { to: 'ml', factor: 1, group: 'volume' },
	cl: { to: 'ml', factor: 10, group: 'volume' },
	l: { to: 'ml', factor: 1000, group: 'volume' },
	tsp: { to: 'ml', factor: 5, group: 'volume' },
	tbsp: { to: 'ml', factor: 15, group: 'volume' },
	cup: { to: 'ml', factor: 240, group: 'volume' },
	each: { to: 'each', factor: 1, group: 'discrete' },
	pc: { to: 'each', factor: 1, group: 'discrete' },
};
