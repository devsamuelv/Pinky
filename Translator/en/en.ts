import { v2 } from "@google-cloud/translate";

export class en {
  private target = "en";

  public async Translate(text: string) {
    const trans = new v2.Translate();
    const message = await trans.translate(text, this.target);

    return message[0];
  }
}
