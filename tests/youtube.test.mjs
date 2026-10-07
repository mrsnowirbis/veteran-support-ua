import test from 'node:test'
import assert from 'node:assert/strict'
import { youtubeId, youtubeThumbnail } from '../src/utils/youtube.ts'

test('all approved series and share/watch tracking URLs resolve to an ID only', () => {
  for (const id of ['JWTZF3lM4PM', '4V2dj40tKY4', 'aZUTd7QV3dU', 'o3ISSODPPO8', 'h2FSXhe5HEg']) {
    assert.equal(youtubeId(`https://youtu.be/${id}?si=tracking`), id)
    assert.equal(youtubeId(`https://www.youtube.com/watch?v=${id}&feature=shared`), id)
  }
})

test('ID case is preserved byte-for-byte, including lowercase l and uppercase U', () => {
  for (const id of ['JWTZF3lM4PM', 'aZUTd7QV3dU']) {
    const parsed = youtubeId(`https://youtu.be/${id}`)
    assert.equal(parsed, id)
    assert.deepEqual(Buffer.from(parsed, 'utf8'), Buffer.from(id, 'utf8'))
  }
  assert.notEqual(youtubeId('https://youtu.be/JWTZF3lM4PM'), 'JWTZF3IM4PM')
  assert.notEqual(youtubeId('https://youtu.be/aZUTd7QV3dU'), 'aZUTd7QV3du')
})

test('reject unsafe schemes, spoofed hosts, credentials, ambiguous and malformed IDs', () => {
  for (const url of [
    'javascript:alert(1)', 'http://youtu.be/JWTZF3IM4PM', '//youtu.be/JWTZF3IM4PM',
    'https://youtu.be.evil.test/JWTZF3IM4PM', 'https://evil.test/watch?v=JWTZF3IM4PM',
    'https://user:password@youtu.be/JWTZF3IM4PM', 'https://youtu.be:8443/JWTZF3IM4PM',
    'https://youtu.be/JWTZF3IM4PM/extra', 'https://youtu.be/%4aWTZF3IM4PM',
    'https://youtube.com/watch?v=JWTZF3IM4PM&v=4V2dj40tKY4',
    'https://youtube.com/watch?v=%3Cscript%3E', 'https://youtu.be/short',
    ' https://youtu.be/JWTZF3IM4PM', 'https://youtu.be/\\JWTZF3IM4PM',
  ]) assert.equal(youtubeId(url), undefined, url)
})

test('thumbnail uses a fixed host and HQ variant, preserving ID and discarding tracking', () => {
  assert.equal(youtubeThumbnail('https://youtu.be/h2FSXhe5HEg?si=tracking'), 'https://i.ytimg.com/vi/h2FSXhe5HEg/hqdefault.jpg')
  assert.equal(youtubeThumbnail('https://www.youtube.com/watch?v=JWTZF3lM4PM'), 'https://i.ytimg.com/vi/JWTZF3lM4PM/hqdefault.jpg')
  for (const value of ['https://i.ytimg.com/vi/h2FSXhe5HEg/hqdefault.jpg', 'https://evil.test/h2FSXhe5HEg', 'https://youtu.be/short', 'javascript:alert(1)']) assert.equal(youtubeThumbnail(value), undefined)
})
