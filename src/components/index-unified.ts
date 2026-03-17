/**
 * Unified Components Index
 * 
 * This file exports all unified components that combine best practices
 * from Youth-Sports-App and Merit-Decoder.
 * 
 * Usage:
 * import { SportCard, SportDetailModal, ChildProfileSection } from './components/index-unified'
 */

export { default as SportCard } from './SportCard-unified';
export { default as SportDetailModal } from './SportDetailModal-unified';
export { default as ChildProfileSection } from './ChildProfileSection-unified';

// UI Components
export * from './ui/button';
export * from './ui/card';
export * from './ui/input';
export * from './ui/label';
export * from './ui/dialog';
export * from './ui/tabs';
export * from './ui/accordion';
export * from './ui/badge';
export * from './ui/avatar';
export * from './ui/select';
export * from './ui/checkbox';
export * from './ui/radio-group';
export * from './ui/switch';
export * from './ui/popover';
export * from './ui/tooltip';
export * from './ui/dropdown-menu';

// Types
export type { ChildProfile, ParentGoals } from './ChildProfileSection-unified';
