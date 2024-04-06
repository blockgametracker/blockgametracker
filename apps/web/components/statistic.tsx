import { DarkContainer } from "./layout/content";
import Icon from "./icon";

export const StatisticSmall = ({ title, value }: any) => (
  <div className="flex flex-row gap-4">
      <p>{title}:</p>
      <p className="text-mainText">{value}</p>
  </div>
)

export const StatisticBig = ({ iconName, title, value }: any) => (
  <DarkContainer className="flex flex-col w-full h-full items-center justify-center">
      <Icon iconName={iconName} className="w-4 h-4 fill-mainColor" />
      <p className="text-lg whitespace-nowrap">{title}</p>
      <h3 className="whitespace-nowrap">{value}</h3>
  </DarkContainer>
)