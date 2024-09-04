import { registerPlugin } from '@pexip/plugin-api'
import { rcicon } from './icon'

const plugin = await registerPlugin({ id: 'chat-engine-plugin', version: 0 })

const urlParams = new URLSearchParams(window.parent.location.search)
const rid = decodeURIComponent(urlParams.get('rid') ?? '')

if (rid !== '') {
  const id = 'chat-engine-plugin'
  window.plugin.iframeManager.add({
    id,
    url: rid,
    type: 'sidePanel'
  })

  const button = await plugin.ui.addButton({
    position: 'toolbar',
    icon: { custom: { main: rcicon, hover: rcicon } },
    tooltip: 'Rocket Chat'
  })

  button.onClick.add(() => {
    void plugin.ui.togglePlugin({ id })
  })
} else {
  console.log(
    'RC discussion link (rid) value not present, not loading the button'
  )
}
