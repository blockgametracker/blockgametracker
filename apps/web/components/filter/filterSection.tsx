import { ICONS_DATA, Icon } from "../icon";

export const FilterSection = ({icon, filter, children}: {icon: keyof typeof ICONS_DATA, filter: string, children: any}) => (
    <div className='flex flex-col gap-4 w-full py-8 px-4'>
      <div className='inline-flex gap-4 items-center'>
        <Icon iconName={icon} className="fill-mainColor w-4 h-4" />
        <h2 className='font-semibold'>{filter}</h2>
      </div>
      <div className='flex flex-col w-full gap-1'>
        {children}
      </div>
    </div>
)