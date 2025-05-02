declare const Buffer
import { AlgorandClient } from '@algorandfoundation/algokit-utils'

async function main(): Promise<void> {
  const APP_ID = 1010

  // Get all boxes for an application
  const algorand = AlgorandClient.defaultLocalNet()

  const boxesResponse = await algorand.client.algod.getApplicationBoxes(APP_ID).do()

  // Or print each box name individually
  for (const box of boxesResponse.boxes) {
    // Convert box names from base64-encoded bytes to strings
    const boxName = Buffer.from(box.name, 'base64').toString('utf-8')
    console.log(`Box name: ${boxName}`)

    const data = await algorand.client.algod.getApplicationBoxByName(APP_ID, box.name).do()
    console.log(Buffer.from(data.name, 'base64').toString('utf-8'))
    console.log(Buffer.from(data.value, 'base64').toString('utf-8'))
  }
}

// Execute the main function
main().catch((error) => {
  console.error('An error occurred:', error)
})
