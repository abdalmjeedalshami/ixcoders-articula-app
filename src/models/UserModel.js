// models/FileModel.js

export class UserModel {
  constructor(data = {}) {
    this.uid = data.fid?.[0]?.value ?? null;
    this.uuid = data.uuid?.[0]?.value ?? "";
    this.langcode = data.langcode?.[0]?.value ?? "en";

    const uid = data.uid?.[0];
    this.user = uid
      ? {
          id: uid.target_id,
          type: uid.target_type,
          uuid: uid.target_uuid,
          url: uid.url,
        }
      : null;

    this.filename = data.filename?.[0]?.value ?? "";
    this.uri = data.uri?.[0]?.value ?? "";
    this.fileUrl = data.uri?.[0]?.url ?? "";
    this.mimeType = data.filemime?.[0]?.value ?? "";
    this.filesize = data.filesize?.[0]?.value ?? 0;
    this.status = data.status?.[0]?.value ?? false;

    this.createdAt = data.created?.[0]?.value ?? null;
    this.changedAt = data.changed?.[0]?.value ?? null;
  }

  isImage() {
    return this.mimeType.startsWith("image/");
  }

  getFilename() {
    return this.filename;
  }

  getDownloadUrl() {
    return this.fileUrl;
  }

  getUserId() {
    return this.user?.id ?? null;
  }
}
