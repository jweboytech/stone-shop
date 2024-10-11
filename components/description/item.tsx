const DescriptionItem = ({
  label,
  value,
  theme,
  colon,
  align,
  size = 'md',
}: DescriptionItemProps) => {
  const alignClassName = align === 'between' ? 'justify-between' : '';

  return (
    <li
      className={`inline-flex flex-col gap-2 items-start ${alignClassName} leading-none`}>
      <span className="text-default-500 text-sm">
        {label}
        {colon ? ':' : ''}
      </span>
      <span
        className={`${theme === 'dark' ? 'text-black' : 'text-white'} ${
          size === 'lg' ? 'text-lg font-bold' : 'text-sm'
        } break-all`}>
        {value != null || value != '' ? value : '-'}
      </span>
    </li>
  );
};

export default DescriptionItem;
