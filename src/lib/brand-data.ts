import clientsData from "@/data/clients.json";
import partnersData from "@/data/partners.json";

import blazePizzaLogo from "@/assets/clients/blazepizza.svg";
import bvlgariLogo from "@/assets/clients/bvlgari.png";
import chanelLogo from "@/assets/clients/chanel.png";
import cheesecakeFactoryLogo from "@/assets/clients/cheesecake_factory.svg";
import diorLogo from "@/assets/clients/dior.png";
import hmLogo from "@/assets/clients/H&M.svg";
import ihopLogo from "@/assets/clients/IHOP.svg";
import jaegerLeCoultreLogo from "@/assets/clients/jaeger-leCoultre.png";
import louisVuittonLogo from "@/assets/clients/louisvuitton.png";
import milkBunLogo from "@/assets/clients/milkBun.png";
import pfChangsLogo from "@/assets/clients/pfchangs.png";
import starbucksLogo from "@/assets/clients/Starbucks.svg";
import texasRoadhouseLogo from "@/assets/clients/Texas_Roadhouse.svg";
import tgiFridaysLogo from "@/assets/clients/TGI_Fridays.svg";
import tiffanyLogo from "@/assets/clients/tiffany_Co.svg";

import bticinoLogo from "@/assets/partners/bticino.svg";
import distechLogo from "@/assets/partners/distech-controls-vector-logo-2022.svg";
import hdlLogo from "@/assets/partners/hdl-automation-logo-vector.svg";
import legrandLogo from "@/assets/partners/legrand.png";
import zennioLogo from "@/assets/partners/zennio.svg";

type AssetStatus = "success" | "placeholder";

export type ClientLogo = {
  name: string;
  logo: string;
  attempted_url?: string;
  scale?: number;
  hidden?: boolean;
};

export type PartnerLogo = {
  name: string;
  logo: string;
  source: string;
  status?: AssetStatus;
  scale?: number;
  hidden?: boolean;
};

export type ResolvedClientLogo = ClientLogo & {
  src: string;
};

export type ResolvedPartnerLogo = PartnerLogo & {
  src: string;
};

const clientAssets: Record<string, string> = {
  "blazepizza.svg": blazePizzaLogo,
  "bvlgari.png": bvlgariLogo,
  "chanel.png": chanelLogo,
  "cheesecake_factory.svg": cheesecakeFactoryLogo,
  "dior.png": diorLogo,
  "H&M.svg": hmLogo,
  "IHOP.svg": ihopLogo,
  "jaeger-leCoultre.png": jaegerLeCoultreLogo,
  "louisvuitton.png": louisVuittonLogo,
  "milkBun.png": milkBunLogo,
  "pfchangs.png": pfChangsLogo,
  "Starbucks.svg": starbucksLogo,
  "Texas_Roadhouse.svg": texasRoadhouseLogo,
  "TGI_Fridays.svg": tgiFridaysLogo,
  "tiffany_Co.svg": tiffanyLogo,
};

const partnerAssets: Record<string, string> = {
  "bticino.svg": bticinoLogo,
  "distech-controls-vector-logo-2022.svg": distechLogo,
  "hdl-automation-logo-vector.svg": hdlLogo,
  "legrand.png": legrandLogo,
  "zennio.svg": zennioLogo,
};

function resolveLogo<T extends ClientLogo | PartnerLogo>(
  item: T,
  assets: Record<string, string>,
): (T & { src: string }) | undefined {
  const src = assets[item.logo];
  if (!src || item.hidden) return undefined;
  return { ...item, src };
}

export const clients = (clientsData.clients as ClientLogo[])
  .map((client) => resolveLogo(client, clientAssets))
  .filter((client): client is ResolvedClientLogo => Boolean(client));

export const partners = (partnersData.partners as PartnerLogo[])
  .map((partner) => resolveLogo(partner, partnerAssets))
  .filter((partner): partner is ResolvedPartnerLogo => Boolean(partner));
