import React, { useState, createContext, useEffect } from 'react'
import * as JsSearch from 'js-search'

import { Appearance, SettingsState } from './types'
import allServices from '../services'
import { setAppearance } from '../lib/set-mode'
import useInterval from '../lib/use-interval'
import { loadState, saveState } from '../lib/storage'
import Service from '../services/service'

interface ContextState {
  settings: SettingsState
  isFetching: boolean
  services: Map<string, Service>
  selected: Array<string>
  searchResults: Array<string>
  add: Function
  remove: Function
  searchInput: string
  handleSearch: Function
  updateSetting: Function
}

export const defaultSettings: SettingsState = {
  openAtStartup: false,
  appearance: Appearance.DARK,
  showNotifications: true,
  playSound: false,
}

const defaultSelected = ['Instatus', 'Vercel', 'Github', 'Dropbox', 'Zoom', 'Cloudflare']

export const Context = createContext<Partial<ContextState>>({})

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isFetching] = useState(false)
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [selected, setSelected] = useState<Array<string>>([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Array<string>>([])
  const [isSettingsInit, setIsSettingsInit] = useState<boolean>(false)
  const search = new JsSearch.Search('name')
  search.sanitizer = new JsSearch.LowerCaseSanitizer()
  search.addIndex('name')
  search.addDocuments(
    Array.from(allServices, ([name, value]) => ({ name, value }))
  )

  useInterval(() => {
    selected.forEach((item) => {
      const service = allServices.get(item)
      service?.updateStatus(settings)
    })
  }, 5000)

  useEffect(() => {
    const initSettings = () => {
      setIsSettingsInit(true)

      const { settings: settingsStored, selected: selectedStored } = loadState()
      if (settingsStored) {
        setSettings(settingsStored)
      } else {
        setSettings(defaultSettings)
      }

      if (typeof settingsStored?.appearance !== 'undefined') {
        setAppearance(settingsStored.appearance)
      } else {
        setAppearance(Appearance.DARK)
      }

      if (selectedStored?.length > 0) {
        setSelected(selectedStored)
      }
      else defaultSelected.forEach(item => add(item))
    }
    if (!isSettingsInit) initSettings()
  }, [])

  const updateSetting = (
    name: keyof SettingsState,
    value: boolean | Appearance
  ) => {
    if (name === 'appearance') setAppearance(value as Appearance)

    const newSettings = { ...settings, [name]: value }
    setSettings(newSettings)
    saveState(newSettings, selected)
  }

  const add = (item: string) => {
    var array = [...selected]
    var index = array.indexOf(item)
    if (index === -1) {
      setSelected(oldArray => [...oldArray, item])
      saveState(settings, selected)
    }
  }

  const remove = (item: string) => {
    var array = [...selected]
    var index = array.indexOf(item)
    if (index !== -1) {
      array.splice(index, 1)
      setSelected(array)
      saveState(settings, selected)
    }
  }

  const handleSearch = (value: string) => {
    if (value === '/') return
    setSearchInput(value)
    const results = search.search(value)
    setSearchResults(results.map(item => item.name))
  }

  return (
    <Context.Provider
      value={{
        isFetching,
        settings,
        services: allServices,
        selected,
        remove,
        add,
        handleSearch,
        searchResults,
        searchInput,
        updateSetting,
      }}
    >
      {children}
    </Context.Provider>
  )
}
