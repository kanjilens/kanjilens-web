import { api } from "@shared/lib/fetch";
import { ApiService } from "@shared/services/api/api.service";

export const kanjiService = new ApiService(api, "/kanji");
