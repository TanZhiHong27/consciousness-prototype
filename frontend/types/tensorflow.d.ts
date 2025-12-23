declare global {
  interface Window {
    cocoSsd: {
      load: () => Promise<any>
    }
    tf: any
  }
}

export {}

