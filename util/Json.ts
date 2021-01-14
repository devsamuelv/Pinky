import fs from "fs";

export class Json {
  static Write(location: string, data: string | NodeJS.ArrayBufferView) {
    fs.writeFileSync(location, data);
  }

  static Read(location: string): Buffer {
    const file = fs.readFileSync(location);

    return file;
  }
}
