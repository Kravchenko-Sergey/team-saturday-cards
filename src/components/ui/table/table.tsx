import { ComponentPropsWithoutRef, FC } from 'react'

export const Table: FC<ComponentPropsWithoutRef<'table'>> = ({ className, ...props }) => {
  return <table className={className} {...props} />
}

export const TableHeader: FC<ComponentPropsWithoutRef<'thead'>> = ({ className, ...props }) => {
  return <thead className={className} {...props} />
}

export const TableBody: FC<ComponentPropsWithoutRef<'tbody'>> = ({ className, ...props }) => {
  return <tbody className={className} {...props} />
}

export const TableFooter: FC<ComponentPropsWithoutRef<'tfoot'>> = ({ className, ...props }) => {
  return <tfoot className={className} {...props} />
}

export const TableRow: FC<ComponentPropsWithoutRef<'tr'>> = ({ className, ...props }) => {
  return <tr className={className} {...props} />
}

export const TableHead: FC<ComponentPropsWithoutRef<'th'>> = ({ className, ...props }) => {
  return <th className={className} {...props} />
}

export const TableCell: FC<ComponentPropsWithoutRef<'td'>> = ({ className, ...props }) => {
  return <td className={className} {...props} />
}

export const TableCaption: FC<ComponentPropsWithoutRef<'caption'>> = ({ className, ...props }) => {
  return <caption className={className} {...props} />
}
