import { env } from '@/env'
import { s3Client } from '@/libs/awsS3Client'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import multer, { StorageEngine } from 'multer'



export const s3Storage: StorageEngine = {
  _handleFile: (_req, file, callback) => {
    const timestamp = Date.now()
    const filename = `${timestamp.toString()}-${file.originalname}`

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: env.AWS_BUCKET_NAME,
        Key: filename,
        Body: file.stream,
        ACL: 'public-read',
        ContentType: file.mimetype
      }
    })

    upload
      .done()
      .then(() => {
        callback(null, {
          filename: filename,
          mimetype: file.mimetype,
          size: file.size,
          path: `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(filename)}`
        })
      })
      .catch((error: unknown) => {
        callback(error)
      })
  },

  _removeFile(_req, file, callback) {
    const deleteParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: file.filename
    }

    s3Client
      .send(new DeleteObjectCommand(deleteParams))
      .then(() => {
        callback(null)
      })
      .catch((error: unknown) => {
        callback(error as Error)
      })
  }
}

export const upload = multer({ storage: s3Storage })
