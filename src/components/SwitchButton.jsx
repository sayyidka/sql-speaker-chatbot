import { Switch } from '@headlessui/react'

export default function SwitchButton({enabled, toggleOption}) {  
  return (
    <div className="py-2 mr-2">
      <Switch
        checked={enabled}
        onChange={toggleOption}
        className={`${enabled ? 'bg-sky-300' : 'bg-sky-600'}
          relative inline-flex h-[19px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
