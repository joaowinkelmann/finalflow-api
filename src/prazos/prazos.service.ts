import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class PrazosService {
  constructor(private prisma: PrismaService) { }
  async create(createPrazoDto: CreatePrazoDto) {

    // verificar se o cronograma existe mesmo
    const cronograma = await this.prisma.cronograma.findUnique({
      where: {
        id_cronograma: createPrazoDto.idcronograma,
      },
    });

    if (!cronograma) {
      throw new NotFoundException('Cronograma não encontrado');
    }

    return await this.prisma.prazo.create({
      data: createPrazoDto,
    }).catch((err) => {
      if (err.code === 'P2002') {
        throw new ConflictException('Prazo já cadastrado');
      } else {
        console.log(err);
        throw new UnprocessableEntityException('Erro ao cadastrar prazo');
      }
    });
  }

  findAll() {
    return `This action returns all prazos`;
  }

  findOne(id: string) {
    return `This action returns a #${id} prazo`;
  }

  update(id: string, updatePrazoDto: UpdatePrazoDto) {
    return `This action updates a #${id} prazo`;
  }

  // async generateAlerts(id_prazo: string, id_usuario: string) {

  //   // criar alertas ponderados para os prazos, aumentando a frequência conforme a data de entrega se aproxima
  //   // se for daqui a 30 dias:
  //   // alerta 1: 30 dias antes
  //   // alerta 2: 20 dias antes
  //   // alerta 3: 10 dias antes
  //   // alerta 4: 5 dias antes
  //   // alerta 5: 3 dias antes
  //   // alerta 6: 1 dia antes

  //   const prazo = await this.prisma.prazo.findUnique({
  //     where: {
  //       id_prazo: id_prazo,
  //     },
  //   }).catch((err) => {
  //     console.log(err);
  //     return new NotFoundException('Prazo não encontrado');
  //   });

  //   const today = new Date();
  //   const deadline = new Date(prazo.dataLimite);

  //   // Step 2: Calculate the total number of days between today and the deadline
  //   const totalDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  //   // If the deadline is already passed, return or handle accordingly
  //   if (totalDays <= 0) {
  //     throw new Error('Deadline has already passed');
  //   }

  //   // Step 3: Define the alert intervals based on the total days
  //   const alertIntervals = [
  //     30, // 30 days before
  //     20, // 20 days before
  //     10, // 10 days before
  //     5,  // 5 days before
  //     3,  // 3 days before
  //     1   // 1 day before
  //   ];

  //   // Filter only intervals that are smaller than totalDays to avoid past alerts
  //   const validAlerts = alertIntervals.filter(interval => interval <= totalDays);
  //   const idUsuario = prazo.idUsuario; // Adjust as necessary to fetch `idUsuario`

  //   // Step 4: Generate alerts based on valid intervals
  //   const alerts = validAlerts.map((daysBefore) => {
  //     const alertDate = new Date(deadline);
  //     alertDate.setDate(alertDate.getDate() - daysBefore); // Calculate the alert date based on daysBefore

  //     return {
  //       prazoId: id,
  //       assunto: `Alerta de Prazo: ${prazo.prazo_tipo}`,
  //       mensagem: `Faltam ${daysBefore} dias para o prazo de ${prazo.prazo_tipo}.`,
  //       data_envio: alertDate,
  //       jaEnviado: false,
  //       idUsuario: idUsuario, // Include the idUsuario for each alert
  //     };
  //   });

  //   // Step 5: Save the generated alerts to the database
  //   return this.alertasService.createMany(alerts);
  // }

  async remove(id: string) {
    return await this.prisma.prazo.delete({
      where: {
        id_prazo: id,
      },
    }).catch((err) => {
      console.log(err);
      throw new NotFoundException('Prazo não encontrado');
    });
  }
}
