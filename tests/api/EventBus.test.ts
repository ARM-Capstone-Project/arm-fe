import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import eventBus from '../../src/api/EventBus'

describe('eventBus', () => {
  let callback: EventListener

  beforeEach(() => {
    callback = vi.fn()
  })

  afterEach(() => {
    document.removeEventListener('testEvent', callback)
  })

  it('should register an event listener', () => {
    eventBus.on('testEvent', callback)

    eventBus.dispatch('testEvent')

    expect(callback).toHaveBeenCalled()
  })

  it('should pass event data to the callback', () => {
    eventBus.on('testEvent', callback)

    const testData = { key: 'value' }
    eventBus.dispatch('testEvent', testData)

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: testData,
      }),
    )
  })

  it('should remove an event listener', () => {
    eventBus.remove('testEvent', callback)

    eventBus.dispatch('testEvent')

    expect(callback).not.toHaveBeenCalled()
  })
})
