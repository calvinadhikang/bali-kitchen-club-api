import { PartialType } from "@nestjs/mapped-types";
import { CreateSesiDto } from "./create-sesi.dto";

export class UpdateSesiDto extends PartialType(CreateSesiDto) {}