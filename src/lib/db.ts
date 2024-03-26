import { Redis } from '@upstash/redis'

export const db = new Redis({
    url: 'https://apn1-fluent-wombat-33971.upstash.io',
    token: 'AYSzASQgNmMxMDgwYjgtZWNmYS00MGEyLTgxOTEtZjVlNzliYmUwMjMxODc2YWJkY2RmM2FiNDdiNDgxOTVhYTMyZGJhZGMyZWY='
})
