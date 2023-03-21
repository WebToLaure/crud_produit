import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';



/**@class ProductsControllers
 * 
 * Une class permettant :
 * * De réunir plusieurs méthodes liées à la construction de la partie produit.
 * * De contrôler les informations entrantes, de les vérifier avant de les envoyer en base de données, suivant un protocole précis et renseigné.
 * * Celle-ci est dédiée uniquement à la création, à la récupération, à la mise à jour et à la suppression des produits.
 */
@ApiTags('PRODUITS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }




  /** 
     * @method CreateProduct :
     * 
     * Une méthode permettant de :
     * * Controler les données entrantes, lors de la création d'un produit.
     * * Vérifier et imposer que les contraintes soient bien respectées (name, price, quantity etc ...)
     * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
     * * De stocker le produit créé en BDD.
     */
  @ApiBody({ type: CreateProductDto })
  @Post()
  @ApiOperation({ summary: "Ajout d'un produit sur application" })
  async createProduct(@Body() createProductDto: CreateProductDto) {

    const response = await this.productsService.createProduct(createProductDto);

    return {
      statusCode: 201,
      data: response,
      message: "Produit ajouté"
    }

  }

  /** 
     * @method findAllProducts :
     * 
     * Une méthode permettant de :
     * * Controler les données entrantes lors de la consultation de tous les produits en stock.
     * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
     */
  @ApiBody({ type: CreateProductDto })
  @Get()
  @ApiOperation({ summary: "Récupération de l'ensemble des produits en stock" })
  async findAllProducts() {

    const allProducts = await this.productsService.findAllProducts();

    if (!allProducts) {

      throw new HttpException("aucun produit trouvé", HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      data: allProducts,
      message: "Ensemble des produits"
    }
  }


  /** 
     * @method findProductById :
     * 
     * Une méthode permettant de :
     * * Controler les données entrantes lors de la consultation d'un produit.
     * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
     */
  @Get(':id')
  @ApiOperation({ summary: "Récupération d'un produit stocké" })
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findProductById(id);
    if (!product) {
      throw new HttpException("ce produit n'est pas en stock", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      data: product,
      message: "Affichage produit demandé"
    }
  }

  /** 
     * @method updateProduct :
     * 
     * Une méthode permettant de :
     * * Controler les données entrantes et vérifier que le protocole de saisie ou de modification soient bien respectés.
     * * Vérifier que le produit existe.
     * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
     * * Valider et remplacer en cas de succès.
     */
  @Patch(':id')
  @ApiOperation({ summary: "Modification d'un produit stocké" })
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.findProductById(id)
    if (!product) {
      throw new HttpException("Le Produit n'existe pas", HttpStatus.NOT_FOUND);
    }
    const update = await this.productsService.update(id,updateProductDto);
    return {
      statusCode: 200,
      message: "Le produit a bien été modifié",
      data: update
    }
  }
  /** 
     * @method deleteProduct :
     * 
     * Une méthode permettant de :
     * * Controler les données entrantes et vérifier que le protocole de saisie ou de modification soient bien respectés.
     * * Vérifier que le produit existe.
     * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
     * * Supprimer le produit si le protocole est respecté.
     */
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'un produit stocké" })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findProductById(id);
    if (!product) {
      throw new HttpException("Produit introuvable.", HttpStatus.NOT_FOUND);
    }
    const response = await this.productsService.deleteProduct(id)
    return {
      statusCode: 200,
      message: "Le produit a bien été supprimé",
      data: response,

    }
  }
}
