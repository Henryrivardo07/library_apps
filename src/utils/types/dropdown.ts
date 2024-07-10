export interface DropdownProps {
  optionsProps: string[];
  placeholder?: string;
  onSelect: (option: string) => void;
}
