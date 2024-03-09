export const ButtonBG = ({children}: any) => (
  <button className="fade p-4 pt-2 pb-2 w-fit border-2 bg-darkFill border-darkOverlay hover:text-mainText hover:border-secondText whitespace-nowrap">
    {children}
  </button>
)

export const Button = ({children}: any) => (
  <button className="fade p-4 pt-2 pb-2 w-fit whitespace-nowrap hover:text-mainText">
    {children}
  </button>
)